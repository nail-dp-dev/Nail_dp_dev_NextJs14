'use client'

import MinusSVG from '../../../../../../public/assets/svg/minus.svg'
import PlusSVG from '../../../../../../public/assets/svg/plus.svg'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../../../../store/slices/loginSlice';
import { decreaseBoxes, increaseBoxes, selectNumberOfBoxes } from '../../../../../../store/slices/boxLayoutSlice';
import { RootState } from '../../../../../../store/store';
import HeartButton from '../../../../../../components/animations/HeartButton';
import { ControlBarProps } from '../../../../../../constants/interface';

export default function ControlBar({archiveName}: ControlBarProps) {

  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) => selectNumberOfBoxes(state));
  const isLoggedIn = useSelector(selectLoginStatus);


  return  (
    <div className='categoryBar w-full h-[66px] flex flex-col items-start justify-between px-[5px]'>
      <div className='categoryDiv w-full h-[53px] flex items-center justify-between border-b-[1px] border-navBotSolidGray'>
        <div className='h-[53px] flex gap-[32px]'>
          <div className='inline-flex min-w-[30px] h-[100%] transition-all items-center justify-center border-b-[3px] border-purple'>
            <p className='text-[0.875rem] font-[700] text-textBlack'>{archiveName}</p>
          </div>
        </div>
        <div className='flex items-center gap-[32px]'>
          <button onClick={() => dispatch(increaseBoxes())} disabled={numberOfBoxes >= 7} className='h-[24px]'>
            <MinusSVG />
          </button>
          <button onClick={() => dispatch(decreaseBoxes())} disabled={numberOfBoxes <= 3} className='h-[24px]'>
            <PlusSVG />
          </button>
          {
            isLoggedIn === 'loggedIn' &&
            <HeartButton
              width='29' height='24' isClicked={false} isGetAllLiked={true}
            />
          }
      </div>
      </div>
      <div className='w-full h-[13px]'></div>
    </div>
  )
}