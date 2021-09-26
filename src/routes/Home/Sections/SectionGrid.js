import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { sectionsPageState } from "../../../recoil/homeRecoil";
import Sections from "./Sections";
import Sorter from "./Sorter";

const StyledSectionsGrid = styled.div`
    grid-area: Sections;
`;

const SectionsGrid = () => {
    const pageValue = useRecoilValue(sectionsPageState);
    return (
        <StyledSectionsGrid>
            <Sorter />
            <React.Suspense fallback={<div>Hello</div>}>
                <Sections />
            </React.Suspense>
            <div>
                <Link
                    to={(location) =>
                        `${location.search ? location.search + "&" : "?"}page=${
                            pageValue - 1
                        }`
                    }
                >
                    Next
                </Link>
                <Link
                    to={(location) =>
                        `${location.search ? location.search + "&" : "?"}page=${
                            pageValue + 1
                        }`
                    }
                >
                    Next
                </Link>
            </div>
        </StyledSectionsGrid>
    );
};

export default SectionsGrid;
