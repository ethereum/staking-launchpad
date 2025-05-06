import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { FormDown, FormUp } from 'grommet-icons';

const Container = styled.div`
  position: relative;
  width: clamp(min(100%, 400px), 50vw, 400px);
`;

const GridCol4 = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  flex: 1;
  column-gap: 1rem;
  width: 100%;
  align-items: center;
`;

const Trigger = styled(GridCol4)`
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
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 4;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  &:hover {
    background-color: #f0f0f0;
  }

  &[data-selected='true'] {
    outline: 1px solid #00000010;
    outline-offset: -1px;
    background-color: #b0e0e680;
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
    margin: 0.125rem 0.25rem;
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
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
};

const Select = ({
  options,
  value,
  onChange,
  onSearchChange,
  placeholder,
  searchPlaceholder,
}: SelectProps) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setSearch('');
  }, [value]);

  const handleSelect = (choice: string) => {
    onChange(choice);
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
      <Trigger onClick={() => setIsOpen(!isOpen)} style={{}}>
        {selectedOption?.label || (
          <div style={{ gridColumn: 'span 3' }}>{placeholder}</div>
        )}
        {isOpen ? <FormUp /> : <FormDown />}
      </Trigger>
      {isOpen && (
        <Content>
          <SearchInput
            type="text"
            value={search}
            onChange={e => {
              const newSearchValue = e.target.value;
              if (newSearchValue !== search) {
                setSearch(newSearchValue);
                if (onSearchChange) {
                  onSearchChange(newSearchValue);
                }
              }
            }}
            placeholder={
              searchPlaceholder ||
              formatMessage({ defaultMessage: 'Type to filter' })
            }
          />
          <GridCol4>
            {filteredOptions.map(option => {
              const isSelected = option.value === value;
              return (
                <Item
                  key={option.value}
                  data-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </Item>
              );
            })}
          </GridCol4>
        </Content>
      )}
    </Container>
  );
};

export default Select;
