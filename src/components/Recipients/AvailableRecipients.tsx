import React from "react";
import {
  Box,
  Heading,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { RecipientsList } from "./RecipientsList";
import { ListItem } from "./ListItem";
import { separateRecipientsGroups } from "./helpers";

interface AvailableRecipientsProps {
  // [domain: string, recipient: object]
  recipientGroups: RecipientsGroup[];
  selectRecipient: (email: string, domain?: string) => void;
  selectAllRecipients: (domain: string) => void;
}

// Component renders the available recipients
export const AvailableRecipients: React.FC<AvailableRecipientsProps> = ({
  recipientGroups,
  selectRecipient,
  selectAllRecipients,
}) => {
  const {
    domainGroups,
    singleRecipients,
  } = separateRecipientsGroups(recipientGroups);

  const handleInputChange = () => {

  };

  return (
    <Flex as="fieldset" direction="column" borderWidth="1px" borderRadius="lg" p="4">
      <Heading as="legend" size="sm" px="3">
        Available recipients
      </Heading>
      <InputGroup mb="4">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search"
          _focus={{ boxShadow: "none", borderColor: "gray.200" }}
          onChange={handleInputChange}
        />
      </InputGroup>
      <Box flex="1" borderWidth="1px">
        {domainGroups.map(([domain, recipients], index) => (
          <RecipientsList
            key={`available-recipient-${domain}`}
            title={domain}
            titleButton="Select All"
            recipients={recipients}
            listItemIcon={ArrowRightIcon}
            onTitleButtonClick={() => selectAllRecipients(domain)}
            onItemClick={(recipient) => selectRecipient(recipient.email, domain)}
          />
        ))}
        <Box mt="2" mb="4" ml="9">
          {singleRecipients.map((recipient) => (
            <ListItem
              key={`available-recipient-${recipient.email}`}
              title={recipient.email}
              icon={ArrowRightIcon}
              onClick={() => selectRecipient(recipient.email)}
            />
          ))}
        </Box>
      </Box>
    </Flex>
  );
};
