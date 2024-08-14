import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AvailableRecipients } from './AvailableRecipients';

const recipientGroups: RecipientsGroup[] = [
  ['timescale.com', [
    { email: 'lab@timescale.com', isSelected: false },
    { email: 'user@timescale.com', isSelected: false },
  ]],
  ['mydomain.com', [{ email: 'user@mydomain.com', isSelected: false }]],
];

const addRecipient = jest.fn();
const selectRecipient = jest.fn();
const selectAllRecipients = jest.fn();
const checkUniqueEmail = jest.fn();

const renderComponent = () => {
  return render(
    <AvailableRecipients
      recipientGroups={recipientGroups}
      addRecipient={addRecipient}
      selectRecipient={selectRecipient}
      selectAllRecipients={selectAllRecipients}
      checkUniqueEmail={checkUniqueEmail}
    />
  );
};

describe('AvailableRecipients Component', () => {
  beforeEach(() => {
    checkUniqueEmail.mockReset();
    addRecipient.mockReset();
    selectRecipient.mockReset();
    selectAllRecipients.mockReset();
  });

  it('should show email address as list items', () => {
    renderComponent();

    expect(screen.getByText('user@mydomain.com')).toBeInTheDocument();
  });

  it('should group emails by domain when multiple emails share the same domain', () => {
    renderComponent();

    expect(screen.getByText('timescale.com')).toBeInTheDocument();
    expect(screen.queryByText('mydomain.com')).not.toBeInTheDocument();
  });

  it('should search for a domain and get relevant email matches', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'timescale' } });

    expect(screen.getByText('lab@timescale.com')).toBeInTheDocument();
    expect(screen.getByText('user@timescale.com')).toBeInTheDocument();
    expect(screen.queryByText('user@myDomain.com')).not.toBeInTheDocument();
  });

  it('should search for a domain and get relevant email matches', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'timescale' } });

    expect(screen.getByText('lab@timescale.com')).toBeInTheDocument();
    expect(screen.getByText('user@timescale.com')).toBeInTheDocument();
    expect(screen.queryByText('user@mydomain.com')).not.toBeInTheDocument();
  });

  it('should show the "Add" button when adding a valid email in the search', () => {
    checkUniqueEmail.mockReturnValue(true);

    renderComponent();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'user@newemail.com' } });

    expect(checkUniqueEmail).toHaveBeenCalledWith('user@newemail.com');
    expect(screen.getByRole('button', { name: "Add" })).toBeInTheDocument();
  });


  it('should display "No company found" when search does not match any domain', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'anotherCompany' } });

    expect(screen.getByText('No company found')).toBeInTheDocument();
  });
});
