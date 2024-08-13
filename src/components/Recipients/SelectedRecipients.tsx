import React, { useState } from "react";
import { Box, Collapse, Flex, Heading } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { RecipientsList, ListItem } from "./RecipientsList";

interface SelectedRecepientsGroupProps {
  title: string;
  hasLists?: boolean;
  children: React.ReactNode;
}

// Component wraps one or multiple lists, to render a Collapse component with title
const SelectedRecepientsGroup: React.FC<SelectedRecepientsGroupProps> = ({
  title,
  hasLists = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        width="100%"
        p="2"
        cursor="pointer"
        _hover={{ backgroundColor: "teal.100" }}
        onClick={toggleCollapse}
      >
        <Box display="flex" alignItems="center" gap="2">
          <Box as={isOpen ? ChevronDownIcon : ChevronRightIcon} boxSize="5" />
          <Box>{title}</Box>
        </Box>
      </Flex>
      <Collapse in={isOpen}>
        <Box pb="4" pl={hasLists ? 5 : 12}>
          {children}
        </Box>
      </Collapse>
    </>
  );
};

interface SelectedRecipientsProps {
  companyRecipientGroups: RecipientsGroup[]; // [company: string, recipient: object]
  emailRecipients: Recipient[];
  removeRecipients: (Recipients: Recipient[]) => void;
}

// Component renders the selected recipients grouped by company and individual emails
export const SelectedRecipients: React.FC<SelectedRecipientsProps> = ({
  companyRecipientGroups,
  emailRecipients,
  removeRecipients,
}) => {
  const selectedRecipientGroups = companyRecipientGroups.filter(
    ([_, recipients]) => recipients.some((recipient) => recipient.isSelected),
  );

  const selectedEmailRecipients = emailRecipients.filter(
    (recipient) => recipient.isSelected,
  );

  return (
    <Box as="fieldset" borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="legend" size="sm" px="3">
        Selected recipients
      </Heading>
      <Box borderWidth="1px" height="100%">
        <SelectedRecepientsGroup title="Company recipients" hasLists>
          {selectedRecipientGroups.map(([company, recipients]) => (
            <RecipientsList
              key={`selected-recipient-${company}`}
              title={company}
              titleButton="Remove all"
              recipients={recipients.filter((recipient) => recipient.isSelected)}
              listItemIcon={DeleteIcon}
              onTitleButtonClick={() => removeRecipients(recipients)}
              onItemClick={() => removeRecipients(recipients)}
            />
          ))}
        </SelectedRecepientsGroup>
        <SelectedRecepientsGroup title="Email recipients">
          {selectedEmailRecipients.map((recipient) => (
            <ListItem
              key={`selected-recipient-${recipient.email}`}
              title={recipient.email}
              icon={DeleteIcon}
              onClick={() => removeRecipients([recipient])}
            />
          ))}
        </SelectedRecepientsGroup>
      </Box>
    </Box>
  );
};
