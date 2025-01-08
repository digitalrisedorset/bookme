import styled from "styled-components";

export const IntroStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    flex: 0 0 auto ;
    width: 100%;
    .content {
        padding: 0 10% 30px;
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        line-height: 2.5rem;
    }
    .general {
        font-size: 1.3rem;
        margin-bottom: 3rem;
        color: var(--black);
        font-weight: bold;
        padding: 0 15%;
        line-height: 2rem;
    }
    .ethos {
        font-size: 1.3rem;
        line-height: 2rem;
    }

    @media (max-width: 600px) {
        h2 {
            font-size: 2.5rem;
        }
        .general {
            font-size: 1.7rem;
            line-height: 1.5;
        }
        .ethos {
            font-size: 1.8rem;
            line-height: 1.5;
        }
    }
    
`