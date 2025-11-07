package com.arcitech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arcitech.model.User;
import com.arcitech.model.UserNotification;

import java.util.List;

/**
 * Repository for managing UserNotification entities.
 * Provides convenient methods to query notifications for users.
 */
@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {

    /**
     * Finds all notifications sent to a specific user.
     *
     * @param recipient the user who received the notifications
     * @return list of notifications
     */
    List<UserNotification> findByRecipient(User recipient);

    /**
     * Finds unread notifications for a user.
     *
     * @param recipient the user
     * @param readFlag  whether the notification has been read
     * @return list of unread notifications
     */
    List<UserNotification> findByRecipientAndReadFlag(User recipient, boolean readFlag);

    /**
     * Deletes all notifications of a user (e.g., when deleting account).
     *
     * @param recipient the user whose notifications should be deleted
     */
    void deleteByRecipient(User recipient);
}
