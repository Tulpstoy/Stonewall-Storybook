import React, { useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import stonewall1 from '../assets/stonewall1.jpg';
import protest1 from '../assets/protest1.jpg';
import protest2 from '../assets/protest2.jpg';
import protest3 from '../assets/protest3.jpg';
import marsha1 from '../assets/marsha1.jpg';
import marsha2 from '../assets/marsh2.jpg';
import marsha3 from '../assets/marsha3.jpg';
import riot1 from '../assets/riot1.jpg';
import riot2 from '../assets/riot2.jpg';
import brick from '../assets/brick.png';
import cops from '../assets/cops.jpg';

// Add brick throwing animation keyframes
const throwBrick = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(100px, -150px) rotate(180deg);
  }
  50% {
    transform: translate(200px, 0) rotate(360deg);
  }
  75% {
    transform: translate(100px, -50px) rotate(540deg);
  }
  100% {
    transform: translate(0, 0) rotate(720deg);
  }
`;

const flipImage = keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(180deg);
  }
`;

const swipeAnimation = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
`;

const StoryContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  padding: ${props => props.isDesktopMode ? '0' : '2rem'};
`;

const Book = styled.div`
  width: 100%;
  max-width: ${props => props.isDesktopMode ? '100%' : '900px'};
  height: ${props => props.isDesktopMode ? '100vh' : 'auto'};
  background: ${props => props.isDesktopMode ? '#1a1a1a' : '#fff'};
  border-radius: ${props => props.isDesktopMode ? '0' : '15px'};
  box-shadow: ${props => props.isDesktopMode ? 'none' : '0 0 50px rgba(0, 0, 0, 0.3)'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageSection = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 400px;
  background: #000;
  position: relative;

  @media (max-width: 768px) {
    height: 40vh;
    min-height: 300px;
  }
`;

const PageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentSection = styled.div`
  padding: 2.5rem;
  background: ${props => props.background || '#fff'};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const PageTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-family: 'Playfair Display', serif;
  margin: 0;
  text-align: center;
  color: #333;
`;

const PageContent = styled.div`
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  color: #444;
  max-width: 65ch;
  margin: 0 auto;
  text-align: center;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);

  &:hover {
    background: #555;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const InteractiveSection = styled.div`
  position: relative;
  width: 100%;
  min-height: ${props => props.isDesktop ? '400px' : '200px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${props => props.isDesktop ? '1rem 0' : '2rem 0'};
  padding: ${props => props.isDesktop ? '0 4rem' : '0'};
`;

const BrickImage = styled.img`
  width: ${props => props.isDesktop ? '60px' : '80px'};
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: ${props => props.isThrown ? throwBrick : 'none'} 1.5s cubic-bezier(.17,.67,.83,.67);
  z-index: 2;

  &:hover {
    transform: ${props => props.isThrown ? 'none' : 'scale(1.1)'};
  }
`;

const CopsImage = styled.img`
  width: ${props => props.isDesktop ? '300px' : '200px'};
  height: ${props => props.isDesktop ? '240px' : '150px'};
  object-fit: cover;
  border-radius: ${props => props.isDesktop ? '12px' : '8px'};
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  animation: ${props => props.isHit ? flipImage : 'none'} 0.8s ease-in-out forwards;
  transform-style: preserve-3d;
`;

const ThrowPrompt = styled.div`
  position: absolute;
  top: -30px;
  left: 80px;
  font-size: 1.2rem;
  color: #666;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const RevealText = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: all 0.5s ease;
  text-align: left;
  margin-top: ${props => props.isDesktop ? '1rem' : '2rem'};
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-size: ${props => props.isDesktop ? '0.95rem' : '1rem'};
  line-height: ${props => props.isDesktop ? '1.6' : '1.8'};

  h3 {
    font-size: ${props => props.isDesktop ? '1.2rem' : '1.3rem'};
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  height: 100%;
  gap: 2rem;
`;

const WelcomeTitle = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-family: 'Playfair Display', serif;
  color: #333;
  margin: 0;
`;

const WelcomeMessage = styled.p`
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: #666;
  max-width: 400px;
  line-height: 1.6;
`;

const SwipeGesture = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 1.5rem;

  &::after {
    content: "👆";
    animation: ${swipeAnimation} 2s infinite;
  }
`;

const DeviceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SwipeZone = styled.div`
  position: absolute;
  top: 0;
  ${props => props.side === 'left' ? 'left: 0;' : 'right: 0;'}
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(
    ${props => props.side === 'left' 
      ? 'to right, rgba(0,0,0,0.2), transparent'
      : 'to left, rgba(0,0,0,0.2), transparent'}
  );
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 25%;
  }
`;

const RestartButton = styled(Button)`
  background: #4a90e2;
  margin-top: 1rem;
  
  &:hover {
    background: #357abd;
  }
`;

const DeviceButton = styled(Button)`
  background: ${props => props.variant === 'desktop' ? '#4a90e2' : '#2ecc71'};
  margin: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.variant === 'desktop' ? '#357abd' : '#27ae60'};
  }
`;

const DesktopLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(600px, 1fr) minmax(500px, 800px);
  height: 100vh;
  background: #1a1a1a;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopImageSection = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const DesktopContent = styled.div`
  padding: 2rem 3rem;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.isInteractive ? 'space-between' : 'flex-start'};

  > ${PageTitle} {
    font-size: clamp(2rem, 3vw, 2.5rem);
    margin-bottom: ${props => props.isInteractive ? '1rem' : '2rem'};
  }

  > ${PageContent} {
    font-size: clamp(1.1rem, 1.5vw, 1.3rem);
    line-height: 1.8;
  }
`;

const DesktopNavigationButtons = styled(NavigationButtons)`
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, white 50%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,0));
  padding: 2rem 0;
  margin-top: 3rem;
`;

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 769px) {
    display: ${props => props.isDesktopMode ? 'none' : 'flex'};
  }
`;

const DeviceSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const pages = [
  {
    title: "Welcome to the Stonewall Story",
    isWelcome: true,
    background: "#fff",
    image: stonewall1,
  },
  {
    title: "The Stonewall Inn - June 1969",
    content: "The Stonewall Inn, located in Greenwich Village, New York City, was one of the few establishments that welcomed LGBTQ+ people in the 1960s. Despite being a sanctuary, it was regularly raided by police in an era when homosexuality was criminalized.",
    image: stonewall1,
    background: "#f8f1e9",
  },
  {
    title: "Marsha P. Johnson",
    content: "Marsha P. Johnson was a prominent figure in the LGBTQ+ rights movement and a key participant in the Stonewall uprising. As a Black trans woman, activist, and self-identified drag queen, she dedicated her life to fighting for LGBTQ+ rights and supporting her community.",
    image: marsha1,
    background: "#e9f0f8",
  },
  {
    title: "The Night of Resistance",
    content: "In the early hours of June 28, 1969, police raided the Stonewall Inn. However, this time was different. The patrons, tired of constant harassment and discrimination, decided to fight back. This act of resistance would become a pivotal moment in LGBTQ+ history.",
    image: riot1,
    background: "#f8e9e9",
  },
  {
    title: "The First Brick at Stonewall",
    content: "Click on the brick below to throw it and learn about a pivotal moment in LGBTQ+ history.",
    image: stonewall1,
    background: "#f8f1e9",
    isInteractive: true,
  },
  {
    title: "The Uprising Begins",
    content: "What began as a police raid transformed into six days of protests and demonstrations. The community, led by trans women of color including Marsha P. Johnson and Sylvia Rivera, stood up against police brutality and discrimination.",
    image: riot2,
    background: "#e9f8f1",
  },
  {
    title: "A Movement is Born",
    content: "The Stonewall Riots became a catalyst for the LGBTQ+ rights movement. Within months, organizations were formed, and the first Pride marches were organized. Marsha P. Johnson continued her activism, co-founding STAR (Street Transvestite Action Revolutionaries) to help homeless LGBTQ+ youth.",
    image: protest2,
    background: "#f1e9f8",
  },
  {
    title: "Legacy and Impact",
    content: "The Stonewall Uprising marked a turning point in the fight for LGBTQ+ rights. Today, the Stonewall Inn is a National Historic Landmark, and Marsha P. Johnson's legacy lives on through the countless lives she touched and the continued fight for equality and justice.",
    image: protest3,
    background: "#f8f8e9",
  }
];

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [brickThrown, setBrickThrown] = useState(false);
  const [copsHit, setCopsHit] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const minSwipeDistance = 50;

  const resetToWelcome = () => {
    setCurrentPage(0);
    setBrickThrown(false);
    setCopsHit(false);
    setIsDesktopMode(false);
  };

  const handleDeviceSelection = (isDesktop) => {
    setIsDesktopMode(isDesktop);
    setCurrentPage(1);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < pages.length - 1) {
      nextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      previousPage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentPage]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setBrickThrown(false);
      setCopsHit(false);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      if (currentPage === 1) {
        resetToWelcome();
      } else {
        setCurrentPage(currentPage - 1);
        setBrickThrown(false);
        setCopsHit(false);
      }
    }
  };

  const handleBrickClick = () => {
    if (!brickThrown) {
      setBrickThrown(true);
      // Set cops as hit after brick animation starts
      setTimeout(() => {
        setCopsHit(true);
      }, 750); // Half of the brick animation duration
    }
  };

  const restartStory = () => {
    resetToWelcome();
  };

  const isLastPage = currentPage === pages.length - 1;

  const renderContent = () => (
    <>
      <PageTitle>{pages[currentPage].title}</PageTitle>
      <PageContent>{pages[currentPage].content}</PageContent>
      
      {pages[currentPage].isInteractive && (
        <>
          <InteractiveSection isDesktop={isDesktopMode}>
            <ThrowPrompt isVisible={!brickThrown}>
              Click the brick to throw it at the cops
            </ThrowPrompt>
            <BrickImage 
              src={brick} 
              alt="Brick from Stonewall" 
              onClick={handleBrickClick}
              isThrown={brickThrown}
              isDesktop={isDesktopMode}
            />
            <CopsImage 
              src={cops} 
              alt="Police at Stonewall" 
              isHit={copsHit}
              isDesktop={isDesktopMode}
            />
          </InteractiveSection>
          
          <RevealText isVisible={brickThrown} isDesktop={isDesktopMode}>
            <h3>The Truth About the First Brick</h3>
            <p>
              While the "first brick" at Stonewall has become legendary, the truth is that no one knows for certain who threw the first object during the uprising. What we do know is that Black and brown trans women, including Marsha P. Johnson and Sylvia Rivera, were at the forefront of the resistance.
            </p>
            <p>
              These brave individuals, particularly trans women of color, played a crucial role in standing up against police brutality and discrimination. They not only participated in the riots but continued their activism long after, fighting for LGBTQ+ rights and creating safe spaces for their community.
            </p>
            <p>
              The myth of the "first brick" serves as a powerful symbol of resistance, but the real story is about the collective courage of marginalized individuals who stood up for their rights and dignity, particularly the trans women of color who were central to the movement.
            </p>
          </RevealText>
        </>
      )}
    </>
  );

  return (
    <StoryContainer isDesktopMode={isDesktopMode}>
      <Book
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        isDesktopMode={isDesktopMode}
      >
        {currentPage === 0 ? (
          <ContentSection background="#fff">
            <WelcomeScreen>
              <WelcomeTitle>Welcome to the Stonewall Story</WelcomeTitle>
              <WelcomeMessage>
                Choose your preferred viewing experience:
              </WelcomeMessage>
              <DeviceSelection>
                <DeviceButton 
                  variant="mobile"
                  onClick={() => handleDeviceSelection(false)}
                >
                  📱 Continue with Mobile
                </DeviceButton>
                <DeviceButton 
                  variant="desktop"
                  onClick={() => handleDeviceSelection(true)}
                >
                  💻 Switch to Desktop
                </DeviceButton>
              </DeviceSelection>
            </WelcomeScreen>
          </ContentSection>
        ) : isDesktopMode ? (
          <DesktopLayout>
            <DesktopImageSection>
              <PageImage 
                src={pages[currentPage].image} 
                alt={pages[currentPage].title} 
              />
            </DesktopImageSection>
            <DesktopContent isInteractive={pages[currentPage].isInteractive}>
              {renderContent()}
              <DesktopNavigationButtons>
                {currentPage > 1 && (
                  <Button onClick={previousPage}>Previous</Button>
                )}
                {currentPage < pages.length - 1 ? (
                  <Button onClick={nextPage}>Next</Button>
                ) : (
                  <RestartButton onClick={restartStory}>
                    Start Over
                  </RestartButton>
                )}
              </DesktopNavigationButtons>
            </DesktopContent>
          </DesktopLayout>
        ) : (
          <MobileLayout isDesktopMode={isDesktopMode}>
            <SwipeZone 
              side="left" 
              disabled={currentPage === 1}
              onClick={previousPage}
            />
            <SwipeZone 
              side="right" 
              disabled={currentPage === pages.length - 1}
              onClick={nextPage}
            />
            <ImageSection>
              <PageImage src={pages[currentPage].image} alt={pages[currentPage].title} />
            </ImageSection>
            <ContentSection background={pages[currentPage].background}>
              {renderContent()}
              <NavigationButtons>
                {currentPage > 1 && (
                  <Button onClick={previousPage}>Previous</Button>
                )}
                {currentPage < pages.length - 1 ? (
                  <Button onClick={nextPage}>Next</Button>
                ) : (
                  <RestartButton onClick={restartStory}>
                    Start Over
                  </RestartButton>
                )}
              </NavigationButtons>
            </ContentSection>
          </MobileLayout>
        )}
      </Book>
    </StoryContainer>
  );
};

export default StoryBook; 