import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    "tasks.insert"(doc) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        
        return TasksCollection.insertAsync({
            ...doc,
            userId: this.userId,
        });
    },

    "tasks.toggleChecked"({_id, isChecked}) {
        return TasksCollection.updateAsync(_id, {
            $set: { isChecked: !isChecked },
        });
    },

    "tasks.delete"({ _id }) {
        return TasksCollection.removeAsync(_id);
    },
});