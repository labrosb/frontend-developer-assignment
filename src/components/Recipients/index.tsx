import React, { useState, useMemo } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { AvailableRecipients } from "./AvailableRecipients";
import { SelectedRecipients } from "./SelectedRecipients";
import { groupRecipientsByDomain } from "./helpers";
import recipientsData from "../../assets/recipientsData.json";

// The main recipients component, renders recipients viewer / selector
export const Recipients: React.FC = () => {
  const initialRecipients = useMemo(() => {
    return groupRecipientsByDomain(recipientsData);
  }, []);

  const [recipientGroups, setRecipientGroups] = useState<RecipientsGroup[]>(
    initialRecipients.domainGroups,
  );
  const [singleRecipients, setSingleRecipients] = useState<Recipient[]>(
    initialRecipients.singleDomains,
  );

  // Add recipients to the selected list
  const handleSelectRecipients = (recipients: Recipient[]) => {
    console.log("Add");
  };

  // Remove recipients from the selected list
  const handleRemoveRecipients = (recipients: Recipient[]) => {
    console.log("Remove");
  };

  return (
    <Container maxW="container.md" py="4">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
        <AvailableRecipients
          companyRecipientGroups={recipientGroups}
          emailRecipients={singleRecipients}
          selectRecipients={handleSelectRecipients}
        />
        <SelectedRecipients
          companyRecipientGroups={recipientGroups}
          emailRecipients={singleRecipients}
          removeRecipients={handleRemoveRecipients}
        />
      </SimpleGrid>
    </Container>
  );
};
