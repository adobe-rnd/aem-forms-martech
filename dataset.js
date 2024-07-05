
function getRandomDate(year = 2024) {
  const start = new Date(year, 6, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRecords() {
  const statuses = ['Gold', 'Diamond', 'Platinum', 'Silver'];
  const gender = ['male', 'female', 'not_specified'];
  const records = [];

  const batchId = `batch${getRandomDate().getTime()}`;

  for (let i = 0; i < 50; i += 1) {
    const record = {
      _id: `${batchId}-${i}`,
      _repo: {
        createDate: getRandomDate(2022).toISOString(),
        modifyDate: getRandomDate(2024).toISOString(),
      },
      _universalsegmentationstage: {
        pseudoID: (9876543213 + i).toString(),
      },
      createdByBatchID: batchId,
      loyalty: {
        status: statuses[i % statuses.length],
        upgradeDate: getRandomDate().toISOString(),
      },
      modifiedByBatchID: batchId,
      person: {
        gender: gender[i % gender.length],
      },
      personID: (9876543213 + i).toString(),
      repositoryCreatedBy: 'VJ',
      repositoryLastModifiedBy: 'VJ',
    };
    records.push(record);
  }

  return records;
}
