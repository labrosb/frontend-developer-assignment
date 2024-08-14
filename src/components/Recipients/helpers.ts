// Function groups recipients by domain
export const groupRecipientsByDomain = (recipients: Recipient[]) => {
  const domainGroups: [string, Recipient[]][] = [];
  const domainMap = new Map<string, Recipient[]>();

  recipients.forEach((recipient) => {
    const domain = recipient.email.split("@")[1];
    // Get the array of recipients for this domain, or create it if it doesn't exist
    let domainRecipients = domainMap.get(domain);

    if (!domainRecipients) {
      domainRecipients = [];
      domainMap.set(domain, domainRecipients);
    }
    // Add the current recipient to the domain's array
    domainRecipients.push(recipient);
    // If this is the first recipient for this domain, add it to domainGroups
    if (domainRecipients.length === 1) {
      domainGroups.push([domain, domainRecipients]);
    }
  });

  return domainGroups;
};

// Seperates recipients that are the only ones in a domain
export const separateRecipientsGroups = (domainGroups: RecipientsGroup[]) => {
  const filteredGroups: RecipientsGroup[] = [];
  const singleRecipients: Recipient[] = [];

  domainGroups.forEach(([domain, recipients]) => {
    if (recipients.length > 1) {
      filteredGroups.push([domain, recipients]);
    } else {
      singleRecipients.push(...recipients);
    }
  });

  return { domainGroups: filteredGroups, singleRecipients };
};

// Seperates the selected recipients that are the only ones in a domain
export const separateSelectedRecipientsGroups = (domainGroups: RecipientsGroup[]) => {
  const filteredGroups: RecipientsGroup[] = [];
  const singleRecipients: Recipient[] = [];

  domainGroups.forEach(([domain, recipients]) => {
    // Filter recipients to include only those that are selected
    const selectedRecipients = recipients.filter(recipient => recipient.isSelected);

    if (selectedRecipients.length > 1) {
      // If more than one selected recipient exists, add to filteredGroups
      filteredGroups.push([domain, selectedRecipients]);
    } else if (selectedRecipients.length === 1) {
      // If exactly one selected recipient exists, add to singleRecipients
      singleRecipients.push(selectedRecipients[0]);
    }
  });

  return {
    selectedGroupDomains: filteredGroups,
    selectedSingleRecipients: singleRecipients,
  };
};


// Function creates a map dictionary to map companies with indexes
export const domainIndexMap = (domainGroups: RecipientsGroup[]) => {
  const domainMap = new Map<string, number>();

  domainGroups.forEach((group, index) => {
    const [domain] = group;
    domainMap.set(domain, index);
  });

  return domainMap;
};
