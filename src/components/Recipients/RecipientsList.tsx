import React, { useState } from "react";
import { Box, Button, Collapse, Flex, Text } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  Icon,
} from "@chakra-ui/icons";

interface ListItemProps {
  title: string;
  icon: typeof Icon;
  onClick: () => void;
}

// Component renders a generic clickable and hoverable row
export const ListItem: React.FC<ListItemProps> = ({ title, icon, onClick }) => {
  return (
    <Flex
      cursor="pointer"
      sx={{ "&:hover": { "& .hover-icon-box": { opacity: 1 } } }}
      onClick={onClick}
    >
      <Text _hover={{ color: "teal.700" }}>{title}</Text>
      <Flex
        className="hover-icon-box"
        alignItems="center"
        ml="6"
        transition="opacity 0.2s ease-in-out"
        opacity="0"
      >
        <Box
          as={icon}
          // ArrowRightIcon is bigger than the rest icons
          boxSize={icon === ArrowRightIcon ? 2.5 : 3.5}
          color="teal.700"
        />
      </Flex>
    </Flex>
  );
};

interface RecipientsListProps {
  title: string;
  titleButton: string;
  recipients: Recipient[];
  listItemIcon: typeof Icon;
  onTitleButtonClick: () => void;
  onItemClick: (index: number, recipient: Recipient) => void;
}

// Component renders a collapse recipients list with customizable actions and corresponding UI
export const RecipientsList: React.FC<RecipientsListProps> = ({
  title,
  titleButton,
  recipients,
  listItemIcon,
  onTitleButtonClick,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleButtonClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    onTitleButtonClick();
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        width="100%"
        p="2"
        cursor="pointer"
        _hover={{ backgroundColor: "teal.100" }}
        sx={{ "&:hover": { "& .title-button": { opacity: 1 } } }}
        onClick={toggleCollapse}
      >
        <Box display="flex" alignItems="center" gap="2">
          <Box as={isOpen ? ChevronDownIcon : ChevronRightIcon} boxSize="5" />
          <Box>{title}</Box>
        </Box>
        <Button
          className="title-button"
          size="xs"
          ml="2"
          opacity="0"
          transition="opacity 0.2s ease-in-out"
          onClick={handleTitleButtonClick}
        >
          {titleButton}
        </Button>
      </Flex>
      <Collapse in={isOpen}>
        <Box pb="4" pl="12">
          {recipients.map((recipient, index) => (
            <ListItem
              key={`item-${title}-${recipient.email}`}
              title={recipient.email}
              icon={listItemIcon}
              onClick={() => onItemClick(index, recipient)}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};
