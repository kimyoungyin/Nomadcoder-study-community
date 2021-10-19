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
            <React.Suspense fallback={<div>Loading...</div>}>
                <Sections />
            </React.Suspense>
        </StyledSectionsGrid>
    );
};

export default SectionsGrid;
