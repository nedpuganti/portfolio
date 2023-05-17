import { ContactInfo, FunFacts, PersonalInfo } from '@app/interfaces/personal.interface';

export const mockContactInfo: ContactInfo = {
  phoneNumber: '4239028634',
  email: 'contact@narenedpuganti.com',
  address: 'N/A',
  website: 'www.narenedpuganti.com'
};

export function mockPersonalInfo(count: number): PersonalInfo {
  return {
    summary: `I am a Full Stack Web Developer from Atlanta, USA. I am very passionate and dedicated to my work.I have ${count} years more work experience and enjoy working in a team or individual.`,
    firstName: 'Naren',
    lastName: 'Edpuganti',
    dob: 'June 1991',
    nationality: 'India',
    phoneNumber: '4239028634',
    email: 'contact@narenedpuganti.com',
    address: 'N/A',
    languages: 'Telugu, English'
  };
}

export function mockFunFacts(count: number): FunFacts[] {
  return [
    {
      name: 'Years Experience',
      value: count
    },
    {
      name: 'Done Projects',
      value: 40
    },
    {
      name: 'Happy Clients',
      value: 20
    }
  ];
}
