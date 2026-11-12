import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App scaffold', () => {
  it('renders the scaffold headline without throwing', () => {
    render(<App />);
    expect(screen.getByText(/^Nature 3D$/i)).toBeInTheDocument();
  });
});
