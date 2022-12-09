// PASSWORD COPY

((d) => {
  d.addEventListener("click", (e) => {
    if (e.target.matches("#password")) {
      e.target.select();
      d.execCommand("copy");
      d.querySelector(".copy-message").classList.add("active");
      setTimeout(() => {
        d.querySelector(".copy-message").classList.remove("active");
      }, 2000);
    }
  });
})(document);

// APP
((d) => {
  let $app = d.getElementById("app"),
    passwordSize = d.getElementById("passwordSize");

  let settings = {
    size: parseInt(passwordSize.value),
    symbols: true,
    numbers: true,
    capitalLetter: true,
    lowercase: true,
  };

  let characters = {
    numbers: "0 1 2 3 4 5 6 7 8 9",
    symbols: "! @ # $ % ^ & * ( ) _ - + = [ { } ] : ; < , > . ? /",
    capitalLetter: "A B C D E F G H I J K L M N O P Q R S T U V X Y Z",
    lowercase: "a b c d e f g h i j k l m n o p q r s t u v x y z",
  };

  // FUNCTIONS

  const changeSetting = (el) => {
    let id = el.id;
    settings[id] = !settings[id];
  };

  const generatePassword = () => {
    let finalCharacters = "",
      password = "";
    for (const prop in settings) {
      if (settings[prop] === true) {
        finalCharacters += characters[prop] + " ";
      }
    }
    finalCharacters = finalCharacters.trim();
    finalCharacters = finalCharacters.split(" ");

    for (let i = 0; i < settings.size; i++) {
      password +=
        finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
    }

    $app.password.value = password;
  };

  // Events
  d.addEventListener("DOMContentLoaded", generatePassword);

  d.addEventListener("click", (e) => {
    if (e.target.matches("#sizeDiminish *") && passwordSize.value > 4) {
      settings.size--;
      passwordSize.value = settings.size;
    }
    if (e.target.matches("#sizeIncrease *")) {
      settings.size++;
      passwordSize.value = settings.size;
    }
    if (e.target.matches(".generate-btn")) {
      e.preventDefault();
      generatePassword();
    }
  });

  d.addEventListener("change", (e) => {
    if (e.target.matches("input[type='checkbox']")) changeSetting(e.target);
    if (e.target.matches("#passwordSize")) settings.size = e.target.value;
  });
})(document);
