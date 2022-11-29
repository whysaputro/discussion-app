function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari lalu`;
  } if (diffHours > 0) {
    return `${diffHours} jam lalu`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} menit lalu`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} detik lalu`;
  }
  return 'just now';
}

function sortByFrequencyAndRemoveDuplicates(array) {
  const frequency = {};
  let value;

  for (let i = 0; i < array.length; i += 1) {
    value = array[i];
    if (value in frequency) {
      frequency[value] += 1;
    } else {
      frequency[value] = 1;
    }
  }

  const uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  function compareFrequency(a, b) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
}

export { postedAt, sortByFrequencyAndRemoveDuplicates };
