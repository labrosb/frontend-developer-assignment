// Function groups recipients by domain (company) if more than one in an array of arrays dataset
// and groups seperately the recipients that their email's domain is single in a single array
export const groupRecipientsByDomain = (recipients: Recipient[]) => {
  const singleDomains: Recipient[] = [];
  const domainGroups: [string, Recipient[]][] = [];

  const domainMap = new Map<string, Recipient[]>();

  recipients.forEach((recipient) => {
    const domain = recipient.email.split("@")[1].split(".")[0];

    let recipients = domainMap.get(domain);

    if (!recipients) {
      recipients = [];
      domainMap.set(domain, recipients);
    }

    recipients.push(recipient);

    if (recipients.length === 1) {
      singleDomains.push(recipient);
    } else if (recipients.length === 2) {
      // Add the recipient to domainGroups and remove the first from singleDomains
      domainGroups.push([domain, recipients]);
      // Remove the last recipient added to singleDomains
      singleDomains.splice(singleDomains.length - 1, 1);
    }
  });

  return { singleDomains, domainGroups };
};

// Function creates a map dictionary to map companies with indexes
export const domainIndexMap = (groups: RecipientsGroup[]) => {
  const domainMap = new Map<string, number>();

  groups.forEach((group, index) => {
    const [domain] = group;
    domainMap.set(domain, index);
  });

  return domainMap;
};
