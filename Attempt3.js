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

class App extends React.Component {
  render() {
    const { isModalOpen } = this.props;
    return (
      <Provider>
        <Router>
          <FullScreenBlurModal open={isModalOpen} />
          <div style={{ filter: isModalOpen ? 'blur(40px)' : null }}>
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

class MusicSystemDetails extends React.Component {
  state = { isSpaceLauncherOpen: false };

  render() {
    return (
      <>
        {isSpaceLauncherOpen && (
          <FullScreenBlurModalPortal onClose={this.handleClose}>
            <p>Content Here</p>
          </FullScreenBlurModalPortal>
        )}

        <ProductImage />
        <Button
          onClick={() => {
            this.setState({ isSpaceLauncherOpen: true });
            dispatch(openBlurModal());
          }}
        />
        <Settings />
      </>
    );
  }

  handleClose = () => {
    this.setState({ isSpaceLauncherOpen: false });
    dispatch(onCloseModal());
  };
}

class FullScreenBlurModalPortal extends React.Component {
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

openBlurModal = () => ({
  type: 'OPEN_BLUR_MODAL'
});

closeBlurModal = () => ({
  type: 'CLOSE_BLUR_MODAL'
});

export default (prevState = false, action) => {
  if (action.type === 'OPEN_BLUR_MODAL') {
    return true;
  }

  if (action.type === 'CLOSE_BLUR_MODAL') {
    return false;
  }

  return prevState;
};
