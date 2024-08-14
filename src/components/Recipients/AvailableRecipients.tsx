import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Heading,
  IconButton,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { AddIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { RecipientsList } from "./RecipientsList";
import { ListItem } from "./ListItem";
import { isValidEmail, separateRecipientsGroups } from "./helpers";

interface AvailableRecipientsProps {
  // [domain: string, recipient: object]
  recipientGroups: RecipientsGroup[];
  addRecipient: (email: string) => void;
  selectRecipient: (email: string, domain?: string) => void;
  selectAllRecipients: (domain: string) => void;
  checkUniqueEmail: (email: string) => boolean;
}

// Component renders the available recipients
export const AvailableRecipients: React.FC<AvailableRecipientsProps> = ({
  recipientGroups,
  addRecipient,
  selectRecipient,
  selectAllRecipients,
  checkUniqueEmail,
}) => {
  // Relying solely on suggestedGroups for rendering
  // as it will revert to recipientGroups when not searching
  const [suggestedGroups, setSuggestedGroups] = useState(recipientGroups);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddButton, setShowAddButton] = useState(false);

  const { domainGroups, singleRecipients } = useMemo(() => {
    return separateRecipientsGroups(suggestedGroups);
  }, [suggestedGroups]);

  useEffect(() => {
    setSuggestedGroups(recipientGroups);
  }, [recipientGroups]);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = ev.target.value.toLowerCase();
    const suggestions = recipientGroups.filter(([domain]) =>
      domain.toLowerCase().includes(searchTerm),
    );
    const isEmail = isValidEmail(searchTerm);
    const isUniqueEmail = isEmail && checkUniqueEmail(searchTerm);

    setSearchTerm(searchTerm);
    setSuggestedGroups(suggestions);
    setShowAddButton(isUniqueEmail);
  };

  const handleAddButtonClick = (ev: React.MouseEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    addRecipient(searchTerm);
    setSearchTerm("");
    setShowAddButton(false);
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
          value={searchTerm}
          _focus={{ boxShadow: "none", borderColor: "gray.200" }}
          onChange={handleInputChange}
        />
        {showAddButton && (
          <InputRightElement>
            <IconButton
              aria-label="Add"
              icon={<AddIcon />}
              size="sm"
              onClick={handleAddButtonClick}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <Box flex="1" borderWidth="1px">
        {domainGroups.map(([domain, recipients]) => (
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
        {domainGroups.length === 0 && singleRecipients.length === 0 && (
          <Flex
            justifyContent="center"
            alignItems="center"
            height="100%"
            minHeight="55"
          >
            <Text>No company found</Text>
          </Flex>
        )}
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
