import React, { useState } from "react";
import { Box, Collapse, Flex, Heading, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { RecipientsList } from "./RecipientsList";
import { ListItem } from "./ListItem";
import { separateSelectedRecipientsGroups } from "./helpers";

interface SelectedRecipientsProps {
  // [domain: string, recipient: object]
  recipientGroups: RecipientsGroup[];
  unselectRecipient: (email: string, domain?: string) => void;
  unselectAllRecipients: (domain: string) => void;
}

// Component renders the selected recipients grouped by company and individual emails
export const SelectedRecipients: React.FC<SelectedRecipientsProps> = ({
  recipientGroups,
  unselectRecipient,
  unselectAllRecipients,
}) => {
  const {
    selectedGroupDomains,
    selectedSingleRecipients,
  } = separateSelectedRecipientsGroups(recipientGroups);

  const hasGroups = selectedGroupDomains.length > 0;

  return (
    <Flex as="fieldset" direction="column" borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="legend" size="sm" px="3">
        Selected recipients
      </Heading>
      <Box flex="1" borderWidth="1px" mt={{ base: "1", md: "14" }}>
        <SelectedRecepientsGroup title="Company recipients" hasLists={hasGroups}>
          {selectedGroupDomains.map(([domain, recipients]) => (
            <RecipientsList
              key={`selected-recipient-${domain}`}
              title={domain}
              titleButton="Remove all"
              recipients={recipients}
              listItemIcon={DeleteIcon}
              onTitleButtonClick={() => unselectAllRecipients(domain)}
              onItemClick={(recipient) => {
                unselectRecipient(recipient.email, domain);
              }}
            />
          ))}
          {!hasGroups && <Text>No company recipients</Text>}
        </SelectedRecepientsGroup>
        <SelectedRecepientsGroup title="Email recipients">
          {selectedSingleRecipients.map((recipient) => (
            <ListItem
              key={`selected-recipient-${recipient.email}`}
              title={recipient.email}
              icon={DeleteIcon}
              onClick={() => unselectRecipient(recipient.email)}
            />
          ))}
          {selectedSingleRecipients.length === 0 && <Text>No emails selected</Text>}
        </SelectedRecepientsGroup>
      </Box>
    </Flex>
  );
};

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
      <Box
        p="2"
        cursor="pointer"
        _hover={{ backgroundColor: "teal.100" }}
        onClick={toggleCollapse}
      >
        <Flex alignItems="center" gap="2">
          <Box as={isOpen ? ChevronDownIcon : ChevronRightIcon} boxSize="5" />
          <Box>{title}</Box>
        </Flex>
      </Box>
      <Collapse in={isOpen}>
        <Box pb="4" pl={hasLists ? 5 : 12}>
          {children}
        </Box>
      </Collapse>
    </>
  );
};
