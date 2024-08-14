import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { RecipientsList } from "./RecipientsList";
import { ListItem } from "./ListItem";

interface AvailableRecipientsProps {
  // [company: string, recipient: object]
  companyRecipientGroups: RecipientsGroup[];
  emailRecipients: Recipient[];
  selectRecipient: (index: number, companyIndex?: number) => void;
  selectAllRecipients: (companyIndex: number) => void;
}

// Component renders the available recipients
export const AvailableRecipients: React.FC<AvailableRecipientsProps> = ({
  companyRecipientGroups,
  emailRecipients,
  selectRecipient,
  selectAllRecipients,
}) => {
  return (
    <Box as="fieldset" borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="legend" size="sm" px="3">
        Available recipients
      </Heading>
      <Box borderWidth="1px" height="100%">
        {companyRecipientGroups.map(([company, recipients], index) => (
          <RecipientsList
            key={`available-recipient-${company}`}
            title={company}
            titleButton="Select All"
            recipients={recipients}
            listItemIcon={ArrowRightIcon}
            onTitleButtonClick={() => selectAllRecipients(index)}
            onItemClick={(listIndex) => selectRecipient(listIndex, index)}
          />
        ))}
        <Box mt="2" mb="4" ml="9">
          {emailRecipients.map((recipient, index) => (
            <ListItem
              key={`available-recipient-${recipient.email}`}
              title={recipient.email}
              icon={ArrowRightIcon}
              onClick={() => selectRecipient(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
