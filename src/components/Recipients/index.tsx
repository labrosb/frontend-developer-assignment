import React, { useState, useMemo } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { AvailableRecipients } from "./AvailableRecipients";
import { SelectedRecipients } from "./SelectedRecipients";
import { groupRecipientsByDomain, domainIndexMap } from "./helpers";
import recipientsData from "../../assets/recipientsData.json";

// The main recipients component, renders recipients viewer / selector
export const Recipients: React.FC = () => {
  const domainGroups = useMemo(() => {
    return groupRecipientsByDomain(recipientsData);
  }, []);

  const [recipientGroups, setRecipientGroups] = useState(domainGroups);
  // Map to help handling actions in the recipientGroups more efficiently
  const [domainGroupsIndexMap, setDomainGroupsIndexMap] = useState(() =>
    domainIndexMap(domainGroups),
  );

  const setIsSelectedRecipient = (value: boolean, email: string, domain?: string) => {
    const group = domain || email.split("@")[1];
    // Get the group index from the map
    const groupIndex = domainGroupsIndexMap.get(group);

    setRecipientGroups((prevGroups) => {
      // Copy the current state to avoid mutating it
      const newGroups = [...prevGroups];
      const newRecipients = newGroups[groupIndex][1].map((recipient) =>
        recipient.email === email
          ? { ...recipient, isSelected: value }
          : recipient,
      );
      // Update the group with the new recipients array
      newGroups[groupIndex] = [newGroups[groupIndex][0], newRecipients];

      return newGroups;
    });
  };

  const setIsSelectedGroup = (value: boolean, group: string) => {
    // Get the group index from the map
    const groupIndex = domainGroupsIndexMap.get(group);

    setRecipientGroups((prevGroups) => {
      // Copy the current state to avoid mutating it
      const newGroups = [...prevGroups];
      // Get the recipients array for the specific group and update all recipients
      const newRecipients = newGroups[groupIndex][1].map((recipient) => ({
        ...recipient,
        isSelected: value,
      }));
      // Update the group with the new recipients array
      newGroups[groupIndex] = [newGroups[groupIndex][0], newRecipients];

      return newGroups;
    });
  };

  const handleSelectRecipient = (email: string, domain?: string) => {
    setIsSelectedRecipient(true, email, domain);
  };

  const handleUnselectRecipient = (email: string, domain?: string) => {
    setIsSelectedRecipient(false, email, domain);
  };

  const handleSelectAllRecipients = (domain: string) => {
    return setIsSelectedGroup(true, domain);
  };

  const handleUnselectAllRecipients = (domain: string) => {
    return setIsSelectedGroup(false, domain);
  };
  
  return (
    <Container maxW="container.md" py="4">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
        <AvailableRecipients
          recipientGroups={recipientGroups}
          selectRecipient={handleSelectRecipient}
          selectAllRecipients={handleSelectAllRecipients}
        />
        <SelectedRecipients
          recipientGroups={recipientGroups}
          unselectRecipient={handleUnselectRecipient}
          unselectAllRecipients={handleUnselectAllRecipients}
        />
      </SimpleGrid>
    </Container>
  );
};
