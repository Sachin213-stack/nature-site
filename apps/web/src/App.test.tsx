import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Nature 3D Complete Experience', () => {
  it('renders the main hero headline and storytelling intro', () => {
    render(<App />);
    expect(screen.getByText(/Nature Loss/i)).toBeInTheDocument();
    expect(screen.getByText(/The Path to/i)).toBeInTheDocument();
    expect(screen.getByText(/Begin Exploration/i)).toBeInTheDocument();
  });

  it('renders all six core storytelling sections', () => {
    render(<App />);
    expect(screen.getAllByText(/Monitored Wildlife Populations/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/The Underground Network/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Food & Agricultural Footprint/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Free-Flowing Living Rivers/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Targeted Species Recovery/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Urban Biodiversity Corridors/i)[0]).toBeInTheDocument();
  });

  it('renders the Recovery Hub with personalized solution cards', () => {
    render(<App />);
    expect(screen.getByText(/Solutions Tailored to Your Reading/i)).toBeInTheDocument();
    expect(screen.getByText(/Landscape-Scale Wildlife Corridors/i)).toBeInTheDocument();
  });

  it('renders the contact form and source registry in footer', () => {
    render(<App />);
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
    expect(screen.getByText(/Primary Documented Sources Registry/i)).toBeInTheDocument();
  });
});
