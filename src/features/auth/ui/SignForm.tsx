export const SignForm = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <form className='flex flex-col gap-10'>
        <h2 className='text-xl font-semibold'>팀 계정으로 로그인하세요.</h2>
        <div className='flex flex-col gap-4'>
          <label className='flex flex-col gap-2'>
            <p className='text-xs'>로그인 ID</p>
            <input type='email' />
          </label>
          <label className='flex flex-col gap-2'>
            <p className='text-xs'>비밀번호</p>
            <input type='email' />
            <p>비밀번호 찾기</p>
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <button>로그인</button>

          <p>
            팀을 만들고싶은 팀장이신가요? <span>회원가입</span>
          </p>
        </div>
      </form>
    </div>
  );
};
