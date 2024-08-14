import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowRightIcon, Icon } from "@chakra-ui/icons";

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
