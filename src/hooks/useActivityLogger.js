import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useActivityLogger = () => {
  const [logging, setLogging] = useState(false);

  // Get user's IP address
  const getUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting IP:", error);
      return "127.0.0.1";
    }
  };

  // Log activity to Firestore
  const logActivity = async (activityType, adminEmail, details = {}) => {
    try {
      setLogging(true);
      const ip = await getUserIP();
      const timestamp = new Date();

      const activityLog = {
        Activity_Type: activityType,
        Activity_Date: timestamp.toLocaleDateString(),
        Activity_Time: timestamp.toLocaleTimeString(),
        Admin_Email: adminEmail,
        IP_Address: ip,
        Activity_Details: details,
        Timestamp: timestamp,
      };

      await addDoc(collection(db, "AdminActivityLogs"), activityLog);
    } catch (error) {
      console.error("Error logging activity:", error);
    } finally {
      setLogging(false);
    }
  };

  // Get activity logs with filtering
  const getActivityLogs = async (
    filters = {},
    pageSize = 50,
    lastDoc = null
  ) => {
    try {
      let q = collection(db, "AdminActivityLogs");

      if (filters.dateFrom) {
        q = query(q, where("Timestamp", ">=", new Date(filters.dateFrom)));
      }
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        q = query(q, where("Timestamp", "<=", toDate));
      }
      if (filters.email) {
        q = query(q, where("Admin_Email", "==", filters.email));
      }
      if (filters.ip) {
        q = query(q, where("IP_Address", "==", filters.ip));
      }

      q = query(q, orderBy("Timestamp", "desc"), limit(100));
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      q = query(q, limit(pageSize));

      const snapshot = await getDocs(q);
      return {
        logs: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
      };
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      return { logs: [], lastDoc: null };
    }
  };

  const ACTIVITY_TYPES = {
    APPROVE_DERMATOLOGIST: "Approved dermatologist",
    REJECT_DERMATOLOGIST: "Rejected dermatologist",
    ADD_PRODUCT: "Added product",
    UPDATE_PRODUCT: "Updated product",
    DELETE_PRODUCT: "Deleted product",
    DEACTIVATE_USER: "Deactivated user",
    VIEW_USER_DETAILS: "Viewed user details",
  };

  return {
    logActivity,
    getActivityLogs,
    logging,
    ACTIVITY_TYPES,
  };
};
