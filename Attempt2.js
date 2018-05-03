class App extends React.Component {
  render() {
    const { isModalOpen } = this.props;
    return (
      <Provider>
        <Router>
          <div style={{ filter: isModalOpen ? 'blur(40px)' : null }}>
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

class MusicSystemDetails extends React.Component {
  state = { isModalOpen: false };

  render() {
    return (
      <>
        <FullScreenBlurModal open={isModalOpen} onClose={this.handleClose}>
          <p>Content Here</p>
        </FullScreenBlurModal>
        <ProductImage />
        <Button onClick={this.handleClick} />
        <Settings />
      </>
    );
  }

  handleClick = () => {
    this.setState({ isModalOpen: true });
    dispatch(openBlurModal());
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
    dispatch(onCloseModal());
  };
}

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

    <div style={styles.root}>
      <CloseButton onClick={onClose} />
      {this.props.children}
    </div>;
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
