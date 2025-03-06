import { useModalStore } from '@/widgets/modal/model/useModalStore';
import { ProfileEditContent } from '@/widgets/profile/ui/ProfileEditContent';
import { ProfileViewContent } from '@/widgets/profile/ui/ProfileViewContent';

export const useProfileModal = () => {
  const openModal = useModalStore((state) => state.openModal);

  // const [isEditMode, setIsEditMode] = useState(false);
  const isEditMode = false;

  const openProfileModal = () => {
    openModal({
      title: isEditMode ? '내 정보 수정' : '내 정보',
      content: isEditMode ? <ProfileEditContent /> : <ProfileViewContent />,
      leftButtonProps: {
        children: isEditMode ? '취소' : '닫기',
      },
      rightButtonProps: {
        children: isEditMode ? '저장' : '수정',
        // onClick 핸들러 추가 -> isEditMode 토글
      },
    });
  };

  return {
    isEditMode,
    openProfileModal,
  };
};
