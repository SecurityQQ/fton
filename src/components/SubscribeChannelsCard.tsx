// examples/SubscribeChannelsCard.tsx
import React, { useEffect, useState } from 'react';

import ChallengeModal from '@/components/ChallengeModal';
import CardWithMenu from '@/components/ui/CardWithMenu';
import RewardText from '@/components/ui/RewardText';
import { useModal } from '@/contexts/ModalContext';
import { useUser } from '@/contexts/UserContext';
import { ChallengeWithStatus } from '@/utils/challenges';

const SubscribeChannelsCard: React.FC = () => {
  const { user } = useUser();
  const { openModal } = useModal();
  const [challenges, setChallenges] = useState<ChallengeWithStatus[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`/api/challenges/${user!.id}`);
        const data = await response.json();
        if (data.challenges) {
          setChallenges(data.challenges);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    if (user) {
      fetchChallenges();
    }
  }, [user]);

  const updateChallengeStatus = (challengeId: string) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
      )
    );
  };

  const handleOpenModal = (challenge: ChallengeWithStatus) => {
    openModal(
      <ChallengeModal
        title={challenge.name}
        description={challenge.description}
        reward={challenge.reward}
        refLink={challenge.refLink}
        userId={user!.id}
        challengeId={challenge.id}
        telegramId={user!.telegramId.toString()} // Ensure telegramId is converted to string
        onSuccess={() => updateChallengeStatus(challenge.id)}
        isCompleted={challenge.isCompleted}
      />
    );
  };

  const menuItems = challenges.map((challenge) => ({
    image: challenge.image,
    title: challenge.description,
    reward: challenge.isCompleted ? 'Выполнено' : `+${challenge.reward}`,
    onClick: () => handleOpenModal(challenge),
  }));

  const renderContent = () => (
    <>
      <span className="text-lg font-semibold">Подписаться на каналы</span>
      <RewardText value="+ 300" label="F" type="white" gradient="green" />
      <span className="px-2 text-sm">
        Зарабатывайте Fem Coin и обменивайте его на другие токены или получайте скидку на
        консультации и многое другое
      </span>
    </>
  );

  return <CardWithMenu gradient="green" renderContent={renderContent} menuItems={menuItems} />;
};

export default SubscribeChannelsCard;
