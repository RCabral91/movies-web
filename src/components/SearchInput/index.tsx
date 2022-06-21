import { useCallback, useState } from 'react';
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
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        onSearch(searchText);
      }
    },
    [onSearch, searchText]
  );

  return (
    <SearchStyle>
      <div className="input-display">
        <div className="d-flex flex-grow-1">
          <input
            onKeyDown={handleKeyPress}
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
      </div>
    </SearchStyle>
  );
};
