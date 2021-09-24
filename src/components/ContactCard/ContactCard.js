import styled from 'styled-components/macro';

const Wrapper = styled.article`
  max-width: 350px;
  border-radius: 32px;
  padding: 50px;
  background: white;
  box-shadow: 0px 2px 20px hsl(248deg 53% 40%);
  text-align: center;
`

const Avatar = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -64px;
  margin-bottom: 16px;
  border: 6px solid white;
`

const CardHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0px;
`

const CardLocation = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: hsl(0deg 0% 40%);
`

const CardEmail = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: hsl(0deg 0% 40%);
`

export default function ContactCard({
  avatarSrc,
  name,
  location,
  email
}) {
  return (
    <Wrapper>
      <Avatar
        alt=""
        src={avatarSrc}
      />
      <CardHeading>{name}</CardHeading>
      <CardLocation>{location}</CardLocation>
      <CardEmail>{email}</CardEmail>
    </Wrapper>
  );
}