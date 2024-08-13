import React, { useState, useMemo } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { AvailableRecipients } from "./AvailableRecipients";
import { SelectedRecipients } from "./SelectedRecipients";
import { groupRecipientsByDomain, domainIndexMap } from "./helpers";
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
  // Map to help handling actions in the recipientGroups more efficiently
  const [domainGroupsIndexMap, setDomainGroupsIndexMap] = useState(() =>
    domainIndexMap(initialRecipients.domainGroups),
  );

  // Sets recipient as selected in the state where belongs
  const handleSelectRecipient = (index: number, groupIndex?: number) => {
    if (groupIndex !== undefined) {
      setRecipientGroups((prevGroups) => {
        // Copy the current state to avoid mutating it
        const newGroups = [...prevGroups];
        const newRecipients = [...newGroups[groupIndex][1]];
        const updatedRecipient = { ...newRecipients[index], isSelected: true };
        newRecipients[index] = updatedRecipient;
        newGroups[groupIndex] = [newGroups[groupIndex][0], newRecipients];

        return newGroups;
      });
    } else {
      // If recipient is not in a group
      setSingleRecipients((prevState) => {
        // Copy the previous state array to avoid direct mutation
        const newRecipients = [...prevState];
        const updatedRecipient = { ...newRecipients[index], isSelected: true };
        newRecipients[index] = updatedRecipient;

        return newRecipients;
      });
    }
  };

  const handleUnselectRecipient = (email: string, group?: string) => {
    if (group) {
      // Get the group index from the map
      const groupIndex = domainGroupsIndexMap.get(group);
      setRecipientGroups((prevGroups) => {
        // Copy the current state to avoid mutating it
        const newGroups = [...prevGroups];
        const newRecipients = newGroups[groupIndex][1].map((recipient) =>
          recipient.email === email
            ? { ...recipient, isSelected: false }
            : recipient,
        );
        // Update the group with the new recipients array
        newGroups[groupIndex] = [newGroups[groupIndex][0], newRecipients];

        return newGroups;
      });
    } else {
      // If recipient is not in a group
      setSingleRecipients((prevState) => {
        return prevState.map((recipient) =>
          recipient.email === email
            ? { ...recipient, isSelected: false }
            : recipient,
        );
      });
    }
  };

  const toggleAllRecipients = (value: boolean, groupIndex: number) => {
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

  const handleSelectAllRecipients = (groupIndex: number) => {
    return toggleAllRecipients(true, groupIndex);
  };

  const handleUnselectAllRecipients = (group: string) => {
    const groupIndex = domainGroupsIndexMap.get(group);
    return toggleAllRecipients(false, groupIndex);
  };

  return (
    <Container maxW="container.md" py="4">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
        <AvailableRecipients
          companyRecipientGroups={recipientGroups}
          emailRecipients={singleRecipients}
          selectRecipient={handleSelectRecipient}
          selectAllRecipients={handleSelectAllRecipients}
        />
        <SelectedRecipients
          companyRecipientGroups={recipientGroups}
          emailRecipients={singleRecipients}
          unselectRecipient={handleUnselectRecipient}
          unselectAllRecipients={handleUnselectAllRecipients}
        />
      </SimpleGrid>
    </Container>
  );
};
