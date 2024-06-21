
import AppProvider from './AppProvider';
import MenuMain from './components/Menu/MenuMain';
function App() {
  return (
    <AppProvider>
      <div>
        <MenuMain />
      </div>
    </AppProvider>
  );
}

export default App;
