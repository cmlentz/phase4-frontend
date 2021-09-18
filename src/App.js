import './App.css';
import GlobalStyles from './components/GlobalStyles';
import FAQ from './components/FAQ/FAQ';
import ContactCard from './components/ContactCard/ContactCard';

function App() {
  return (
    <>
    <div className="App">
      <FAQ question="Where would you use styled components?" answer="Everywhere!" />
      <ContactCard
        avatarSrc="https://cdn.quotesgram.com/small/61/60/913087158-laugh.jpg"
        name="Mittens"
        email="meow@gmail.com"
      />
    </div>
    <GlobalStyles />
    </>
  );
}

export default App;
