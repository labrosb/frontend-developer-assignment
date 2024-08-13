import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { RecipientsList, ListItem } from "./RecipientsList";

interface AvailableRecipientsProps {
  companyRecipientGroups: RecipientsGroup[]; // [company: string, recipient: object]
  emailRecipients: Recipient[];
  selectRecipients: (Recipients: Recipient[]) => void;
}

// Component renders the available recipients
export const AvailableRecipients: React.FC<AvailableRecipientsProps> = ({
  companyRecipientGroups,
  emailRecipients,
  selectRecipients,
}) => {
  return (
    <Box as="fieldset" borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="legend" size="sm" px="3">
        Available recipients
      </Heading>
      <Box borderWidth="1px" height="100%">
        {companyRecipientGroups.map(([company, recipients]) => (
          <RecipientsList
            key={`available-recipient-${company}`}
            title={company}
            titleButton="Select All"
            recipients={recipients}
            listItemIcon={ArrowRightIcon}
            onTitleButtonClick={() => selectRecipients(recipients)}
            onItemClick={() => selectRecipients(recipients)}
          />
        ))}
        <Box mt="2" mb="4" ml="9">
          {emailRecipients.map((recipient) => (
            <ListItem
              key={`available-recipient-${recipient.email}`}
              title={recipient.email}
              icon={ArrowRightIcon}
              onClick={() => selectRecipients([recipient])}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
