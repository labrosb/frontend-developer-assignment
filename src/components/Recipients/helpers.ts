// Function groups recipients by domain (company) if more than one
// and groups seperately the recipients that their email's domain is single
export const groupRecipientsByDomain = (data: Recipient[]) => {
  const domainGroups = data.reduce((acc: RecipientGroups, item: Recipient) => {
    const domain = item.email.split("@")[1].split(".")[0];
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(item);
    return acc;
  }, {});

  const singleDomains: Recipient[] = [];
  const groupedDomains: RecipientGroups = {};

  Object.keys(domainGroups).forEach((domain) => {
    if (domainGroups[domain].length === 1) {
      singleDomains.push(domainGroups[domain][0]);
    } else {
      groupedDomains[domain] = domainGroups[domain];
    }
  });

  return { singleDomains, groupedDomains };
};
