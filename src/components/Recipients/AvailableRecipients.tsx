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
    </Flex>
  );
};
