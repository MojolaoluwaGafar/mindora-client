import React from 'react'

interface CardProp {
  id: number
  heading: string
  subHeading: string
}

const Card = ({ id, heading, subHeading }: CardProp) => {
  return (
    <div className='bg-[#FFFFFF] rounded-[20px] w-[395px] h-[225px] flex flex-col items-center justify-between px-[23px] py-[26px]'>
      <span className='rounded-full bg-[#0D9488] h-[55px] w-[55px] flex items-center justify-center text-white fontDMSans text-lg'>
        {id}
      </span>
      <h1 className='text-[#0A1916] text-[20px] font-semibold fontDMSans'>{heading}</h1>
      <p className='text-[#747272] text-[16px] fontDMSans text-center'>{subHeading}</p>
    </div>
  )
}

export default function HowItIsWorks() {
  const data: CardProp[] = [
    {
      id: 1,
      heading: "Open the chat",
      subHeading: "No sign-up required. Click and start talking instantly."
    },
    {
      id: 2,
      heading: "Share how you feel",
      subHeading: "Tell Mindora what is on your mind. Everything stays private."
    },
    {
      id: 3,
      heading: "Get support",
      subHeading: "Receive compassionate guidance, coping strategies, and resources."
    }
  ]

  return (
    <div className='w-full bg-[#0D9488]'>
      <div className='container flex flex-col items-center mx-auto py-20 px-10'>
        <h1 className='fontCreateRound text-white text-[32px]'>How Mindora Works</h1>
        <p className='text-[18px] text-[#E6E4E4] mb-8'>
          Three simple steps to get the support you need.
        </p>
        <div className='flex w-full gap-[40px]'>
          {data.map((dt) => (
            <Card key={dt.id} id={dt.id} heading={dt.heading} subHeading={dt.subHeading} />
          ))}
        </div>
      </div>
    </div>
  )
}
