import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { SearchStyle } from './styles';

interface ISearchInputProps {
  placeholder?: string;
  onSearch(searchText: string): void;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  placeholder = '',
  onSearch,
}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <SearchStyle>
      <form className="input-display">
        <div className="d-flex flex-grow-1">
          <input
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            placeholder={placeholder}
            type="text"
            className="form-control input"
          />
          <button
            onClick={() => onSearch(searchText)}
            type="button"
            className="input color-white"
          >
            <MdSearch />
          </button>
        </div>
      </form>
    </SearchStyle>
  );
};
