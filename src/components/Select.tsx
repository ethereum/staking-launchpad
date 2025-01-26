import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Checkmark, FormDown, FormUp } from 'grommet-icons';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

const Content = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const Item = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  label: string;
};

export type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <Container ref={containerRef}>
      <Trigger onClick={() => setIsOpen(!isOpen)}>
        <span>
          {options.find(option => option.value === value)?.label || placeholder}
        </span>
        {isOpen ? <FormUp /> : <FormDown />}
      </Trigger>
      {isOpen && (
        <Content>
          <SearchInput
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={formatMessage({ defaultMessage: 'Type to filter' })}
          />
          {filteredOptions.map(option => (
            <Item
              key={option.value}
              data-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {option.value === value && <Checkmark />}
            </Item>
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Select;
