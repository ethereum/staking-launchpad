import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Checkmark, FormDown, FormUp } from 'grommet-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 380px;
`;

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
`;

const Content = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  inset-inline: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
`;

const Item = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  &:hover {
    background-color: #f0f0f0;
  }

  &[data-selected='true'] {
    background-color: #e0e0e0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

export type Option = {
  value: string;
} & (
  | {
      label: string;
      searchContext?: string;
    }
  | {
      label: React.ReactNode;
      searchContext: string;
    }
);

export type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
};

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
}: SelectProps) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (choice: string) => {
    onChange(choice);
    setIsOpen(false);
    setSearch('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = options.filter(option => {
    const hasSearchContext = 'searchContext' in option;
    const hasStringLabel = typeof option.label === 'string';
    let fullSearchContext: string;

    if (hasStringLabel && hasSearchContext) {
      fullSearchContext = `${option.searchContext}${option.label}`;
    } else if (hasSearchContext) {
      fullSearchContext = option.searchContext!;
    } else {
      fullSearchContext = option.label as string;
    }
    return fullSearchContext.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container ref={containerRef}>
      <Trigger
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '1rem',
          fontSize: '18px',
        }}
      >
        <span>{selectedOption?.label || placeholder}</span>
        {isOpen ? <FormUp /> : <FormDown />}
      </Trigger>
      {isOpen && (
        <Content>
          <SearchInput
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={
              searchPlaceholder ||
              formatMessage({ defaultMessage: 'Type to filter' })
            }
          />
          {filteredOptions.map(option => (
            <Item
              key={option.value}
              data-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              <Checkmark
                style={{
                  fill: '#26AB83',
                  visibility: option.value === value ? 'visible' : 'hidden',
                }}
              />
            </Item>
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Select;
