import {useRef, useEffect} from 'react';
import {Form, useSearchParams} from 'react-router';

export default function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [params] = useSearchParams();
  const term = params.get('q') ?? '';

  useAutoFocus(inputRef);

  return (
    <div className="search-page">
      <header className="search-header" />

      <main className="search-main">
        <h1 className="search-title">Search</h1>

        <Form method="get" action="/search" className="search-bar">
          <input
            ref={inputRef}
            type="search"
            name="q"
            defaultValue={term}
            className="search-input"
          />
          <button type="submit" className="search-icon">
            🔍
          </button>
        </Form>

        {term && (
          <div className="search-results">
            {/* Render results here */}
          </div>
        )}
      </main>

      <footer className="search-footer" />
    </div>
  );
}

/* Auto focus ONLY on this page */
function useAutoFocus(inputRef: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    inputRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);
}
