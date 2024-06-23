import { useTranslations } from 'next-intl';
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
  const t = useTranslations('');

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
        title={t(challenge.name)}
        description={t(challenge.description)}
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
    reward: challenge.isCompleted ? t('subscribe_channels_card.completed') : `+${challenge.reward}`,
    onClick: () => handleOpenModal(challenge),
  }));

  const renderContent = () => (
    <>
      <span className="text-lg font-semibold">{t('subscribe_channels_card.title')}</span>
      <RewardText
        value={t('subscribe_channels_card.reward_text')}
        label="F"
        type="white"
        gradient="green"
      />
      <span className="px-2 text-sm">{t('subscribe_channels_card.description')}</span>
    </>
  );

  return <CardWithMenu gradient="green" renderContent={renderContent} menuItems={menuItems} />;
};

export default SubscribeChannelsCard;
