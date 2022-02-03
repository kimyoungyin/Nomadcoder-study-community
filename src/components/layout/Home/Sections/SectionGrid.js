import React from "react";
import styled from "styled-components";
import Sections from "./Sections";
import Sorter from "./Sorter";

const StyledSectionsGrid = styled.div`
    grid-area: Sections;
`;

const SectionsGrid = () => {
    return (
        <StyledSectionsGrid>
            <Sorter />
            <Sections />
        </StyledSectionsGrid>
    );
};

export default SectionsGrid;
