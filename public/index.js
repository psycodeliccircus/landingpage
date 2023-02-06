window.addEventListener('load', () => {
  let loadingAnimation = document.querySelector('.load');

  setTimeout(() => {
    loadingAnimation.style.display = 'none';
  }, 2000);
});

const image = document.querySelector('.main-content-image');

function mudaImg(id = 1) {
  switch (id) {
    case 1:
      image.src = 'assets/images/ballebot.svg';
      break;
    case 2:
      image.src = 'assets/images/ballebot2.svg';
      break;
    case 3:
      image.src = 'assets/images/ballebot3.svg';
      break;
    case 4:
      image.src = 'assets/images/ballebot4.svg';
      break;
    case 5:
      image.src = 'assets/images/ballebot4.svg';
      break;
    case 6:
      image.src = 'assets/images/ballebot3.svg';
      break;
    case 7:
      image.src = 'assets/images/ballebot2.svg';
      break;
    case 8:
      image.src = 'assets/images/ballebot.svg';
      break;
    default:
      image.src = 'assets/images/ballebot.svg';
      break;
  }
}

mudaImg();