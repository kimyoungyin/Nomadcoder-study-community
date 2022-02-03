import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import useInput from "../../../Hooks/useInput";
import { searchInputState } from "../../../recoil/homeRecoil";

const StyledHomeHeader = styled.div`
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        font-size: 3rem;
        line-height: 1;
        font-weight: 600;
        color: ${(props) => props.theme.grey_910};
    }
    p {
        font-size: 1.25rem;
        margin: 0.75rem 0 2rem;
    }
`;

const StyledSearchBox = styled.div`
    margin: 2.5rem 0 9rem 0;
    padding-top: 5rem;
    display: flex;
    justify-content: center;
    form {
        width: 100%;
        max-width: 32rem;
        display: flex;
        align-items: center;
        margin: 0 auto;
        position: relative;
        input {
            font-size: 1rem;
            width: 100%;
            padding: 1rem 2.5rem 1rem 1.25rem;
            box-shadow: ${(props) => props.theme.shadow_xl};
            border: 1px solid ${(props) => props.theme.grey_border};
            border-radius: 0.5rem;
        }
        button {
            background-color: inherit;
            border: none;
            position: absolute;
            right: 1.25rem;
            font-size: 1.5rem;
            svg {
                width: 0.875em;
            }
        }
    }
`;

const HomeHeader = ({ categoryObj, isSearch }) => {
    const setSearchInput = useSetRecoilState(searchInputState);
    const input = useInput("");

    const searchInputSubmitHandler = (event) => {
        event.preventDefault();
        setSearchInput(input.value);
    };

    return (
        <>
            {!isSearch ? (
                <StyledHomeHeader>
                    <h2>
                        {categoryObj ? `#${categoryObj.category}` : "Community"}
                    </h2>
                    <p>
                        {categoryObj
                            ? categoryObj.description
                            : "개발자 99% 커뮤니티에서 수다 떨어요!"}
                    </p>
                </StyledHomeHeader>
            ) : (
                <StyledSearchBox>
                    <form onSubmit={searchInputSubmitHandler}>
                        <input
                            type="text"
                            {...input}
                            placeholder="검색어 입력 후 엔터를 치세요"
                            autoFocus
                        />
                        <button>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </form>
                </StyledSearchBox>
            )}
        </>
    );
};

export default HomeHeader;
