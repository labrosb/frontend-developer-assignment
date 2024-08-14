import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SelectedRecipients } from './SelectedRecipients';

const recipientGroups: RecipientsGroup[] = [
  ['timescale.com', [
    { email: 'lab@timescale.com', isSelected: true },
    { email: 'user@timescale.com', isSelected: true },
    { email: 'user2@timescale.com', isSelected: false },
  ]],
  ['mydomain.com', [{ email: 'user@mydomain.com', isSelected: true }]],
  ['otherdomain.com', [{ email: 'user@otherdomain.com', isSelected: false }]],
];

const unselectedRecipientGroups: RecipientsGroup[] = [
  ['timescale.com', [
    { email: 'lab@timescale.com', isSelected: false },
    { email: 'user@timescale.com', isSelected: false },
  ]],
  ['mydomain.com', [{ email: 'user@mydomain.com', isSelected: false }]],
];

const unselectRecipient = jest.fn();
const unselectAllRecipients = jest.fn();

const renderComponent = (recipientGroups: RecipientsGroup[]) => {
  return render(
    <SelectedRecipients
      recipientGroups={recipientGroups}
      unselectRecipient={unselectRecipient}
      unselectAllRecipients={unselectAllRecipients}
    />
  );
};

describe('SelectedRecipients Component', () => {
  beforeEach(() => {
    unselectRecipient.mockReset();
    unselectAllRecipients.mockReset();
  });

  it('should only display selected recipients when isSelected is true', () => {
    renderComponent(recipientGroups);

    expect(screen.getByText('lab@timescale.com')).toBeInTheDocument();
    expect(screen.getByText('user@timescale.com')).toBeInTheDocument();
    expect(screen.getByText('user@mydomain.com')).toBeInTheDocument();

    expect(screen.queryByText('user2@timescale.com')).not.toBeInTheDocument();
    expect(screen.queryByText('user@otherdomain.com')).not.toBeInTheDocument();
  });

  it('should group emails by domain when multiple emails share the same domain', () => {
    renderComponent(recipientGroups);

    expect(screen.getByText('timescale.com')).toBeInTheDocument();
    expect(screen.queryByText('mydomain.com')).not.toBeInTheDocument();
  });

  it('should display "No company recipients" in the companies list, if is empty', () => {
    renderComponent(unselectedRecipientGroups);

    // Ensuring that no emails are displayed in the list
    expect(screen.queryByText('lab@timescale.com')).not.toBeInTheDocument();
    expect(screen.queryByText('user@timescale.com')).not.toBeInTheDocument();

    expect(screen.getByText('No company recipients')).toBeInTheDocument();
  });

  it('should display "No emails selected" in the emails list, if is empty', () => {
    renderComponent(unselectedRecipientGroups);

    // Ensuring that no emails are displayed in the list
    expect(screen.queryByText('lab@timescale.com')).not.toBeInTheDocument();
    expect(screen.queryByText('user@timescale.com')).not.toBeInTheDocument();

    expect(screen.getByText('No emails selected')).toBeInTheDocument();
  });

  it(`should display the "No company recipients" and "No emails selected" messages when no data provided`, () => {
    renderComponent([]);

    expect(screen.getByText('No emails selected')).toBeInTheDocument();
  });
});
