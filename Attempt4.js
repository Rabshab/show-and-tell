class FullScreenBlurModal extends React.Component {
  getStyles = ({ open }) => ({
    root: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 30,
      display: open ? 'flex' : 'none'
    }
  });

  render() {
    const styles = getStyles(this.props);
    const { onClose } = this.props;

    return <div style={styles.root} id="full-screen-modal" />;
  }
}

const FullScreenBlurModalContext = React.createContext({
  onOpenModal: () => {},
  onCloseModal: () => {}
});

class App extends React.Component {
  state = { isModalOpen: false };
  render() {
    const { isModalOpen } = this.state;
    return (
      <Provider>
        <Router>
          <FullScreenBlurModal open={isModalOpen} />
          <div style={{ filter: isModalOpen ? 'blur(40px)' : null }}>
            <FullScreenBlurModalContext.Provider
              value={{ onOpenModal, onCloseModal }}
            >
              <Main />
            </FullScreenBlurModalContext.Provider>
          </div>
        </Router>
      </Provider>
    );
  }

  onOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };
}

class MusicSystemDetails extends React.Component {
  state = { isSpaceLauncherOpen: false };

  render() {
    return (
      <>
        {isModalOpen && (
          <FullScreenBlurModalPortal onClose={this.handleClose}>
            <p>Content Here</p>
          </FullScreenBlurModalPortal>
        )}

        <ProductImage />
        <Button onClick={() => this.setState({ isSpaceLauncherOpen: true })} />
        <Settings />
      </>
    );
  }

  handleClose = () => this.setState({ isSpaceLauncherOpen: false });
}

class FullScreenBlurModalPortal extends React.Component {
  render() {
    return (
      <FullScreenModalContext.Consumer>
        {({ onOpenModal, onCloseModal }) => (
          <Portal
            {...props}
            onOpen={onOpenModal}
            onClose={() => {
              onCloseModal();
              props.onClose();
            }}
          />
        )}
      </FullScreenModalContext.Consumer>
    );
  }
}

class Portal extends React.Component {
  render() {
    const { onClose } = this.props;

    return ReactDOM.createPortal(
      <>
        <CloseButton onClick={onClose} />
        {this.props.children}
      </>,
      document.getElementById('full-screen-modal')
    );
  }
}
