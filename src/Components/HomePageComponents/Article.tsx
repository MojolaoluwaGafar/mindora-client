import React from 'react'
import { HeartPulse } from 'lucide-react'
import { Newspaper } from 'lucide-react';

interface CardProp {
    icon: React.ReactNode,
    category : "Exercises" | "Article",
    heading: string,
    subHeading: string
}

const Card = ({icon, category, heading, subHeading }: CardProp) => {
  return (
    <div className='bg-[#FFFFFF] border border-[#E6E2E2] rounded-[20px] lg:h-[186px] flex flex-col gap-[18px] px-[23px] py-[26px]'>
      <div className='flex gap-2 items-center'>
      <span className='bg-[#E7FCFA] text-[#054943] h-[36px] w-[36px] text-[16px] flex items-center justify-center' >{icon}</span>
      <span className='text-[16px] text-[#054943] font-semibold'>{category}</span>
      </div>
      <h1 className='text-[#0A1916] text-[20px] font-semibold fontDMSans'>{heading}</h1>
      <p className='text-[#747272] text-[16px] fontDMSans'>{subHeading}</p>
    </div>
  )
}

export default function Article() {
  const data: CardProp[] = [
    {
      icon : <HeartPulse />,
      category : "Exercises",
      heading: "5-4-3-2-1 Grounding Technique",
      subHeading: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste."
    },
    {
      icon : <Newspaper />,
      category : "Article",
      heading: "Understanding Panic Attacks",
      subHeading: "Learn what happens during a panic attack and how to manage symptoms."
    },
    {
      icon : <HeartPulse />,
      category : "Exercises",
      heading: "Box Breathing Guide",
      subHeading: "Inhale 4s · hold 4s · exhale 4s · hold 4s. Repeat 4 times."
    },
    {
      icon : <Newspaper />,
      category : "Article",
      heading: "Building a Support Network",
      subHeading: "How to reach out and build meaningful connections with others."
    },
    {
      icon : <HeartPulse />,
      category : "Exercises",
      heading: "Step Outside",
      subHeading: "Two minutes of fresh air can shift the moment."
    },
    {
      icon : <Newspaper />,
      category : "Article",
      heading: "Sleep Hygiene Checklist",
      subHeading: "Practical tips to improve your sleep quality tonight."
    },
  ]

  return (
    <div className='w-full bg-[#FFFFFF]'>
      <div className='container flex flex-col items-center mx-auto py-20 px-10'>
        <h1 className='fontCreateRound text-[32px]'>Quick Self Care</h1>
        <p className='text-[18px] mb-8 py-1 sm:text-center'>
            Curated articles and exercises to help you navigate difficult moments.
        </p>
        <div className='w-full grid lg:grid-cols-3 gap-[40px]'>
          {data.map((dt, index) => (
            <Card key={index} icon={dt.icon} category={dt.category} heading={dt.heading} subHeading={dt.subHeading} />
          ))}
        </div>
      </div>
    </div>
  )
}
