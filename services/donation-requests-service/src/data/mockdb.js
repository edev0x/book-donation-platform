function mockDatabase() {
    const dataStore = [];

    function donationRequestExists(id) {
        return dataStore.findIndex((value) => value.id === id) !== -1;
    }

    function create(donationRequest) {
        if(donationRequestExists(donationRequest.id)) {
            throw new Error("Donation request already exists");
        }

        dataStore.push(donationRequest);
    }

    function findById(id) {
        return dataStore.find((value) => value.id === id);
    }

    function getAll() {
        return dataStore;
    }

    function deleteById(id) {
        if(!donationRequestExists(id)) {
            throw new Error(`Donation request with id ${id} does not exist`);
        }

        dataStore.splice(
            dataStore.findIndex((value) => value.id === id),
            1
        );
    }

    function update(id, donationRequest) {
        if(!donationRequestExists(id)) {
            throw new Error(`Donation request with id ${id} does not exist`);
        }

        const index = dataStore.findIndex((value) => value.id === id);
        const updatedRequest = {
            ...dataStore[index],
            ...donationRequest,
            id,
        };

        dataStore.splice(index, 1, updatedRequest);
        return updatedRequest;
    }

    return {
        create,
        findById,
        update,
        getAll,
        deleteById
    };
}

const mockDatabaseInstance = mockDatabase();

module.exports = mockDatabaseInstance;