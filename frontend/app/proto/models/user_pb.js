// source: models/user.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var models_common_pb = require('../models/common_pb.js');
goog.object.extend(proto, models_common_pb);
goog.exportSymbol('proto.user.Role', null, global);
goog.exportSymbol('proto.user.User', null, global);
goog.exportSymbol('proto.user.UserID', null, global);
goog.exportSymbol('proto.user.UserInfo', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.user.UserID = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.user.UserID, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.user.UserID.displayName = 'proto.user.UserID';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.user.UserInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.user.UserInfo.repeatedFields_, null);
};
goog.inherits(proto.user.UserInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.user.UserInfo.displayName = 'proto.user.UserInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.user.User = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.user.User, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.user.User.displayName = 'proto.user.User';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.user.UserID.prototype.toObject = function(opt_includeInstance) {
  return proto.user.UserID.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.user.UserID} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.UserID.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.user.UserID}
 */
proto.user.UserID.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.user.UserID;
  return proto.user.UserID.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.user.UserID} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.user.UserID}
 */
proto.user.UserID.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.user.UserID.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.user.UserID.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.user.UserID} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.UserID.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
};


/**
 * optional int64 ID = 1;
 * @return {number}
 */
proto.user.UserID.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.user.UserID} returns this
 */
proto.user.UserID.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.user.UserInfo.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.user.UserInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.user.UserInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.user.UserInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.UserInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    surname: jspb.Message.getFieldWithDefault(msg, 2, ""),
    middleName: jspb.Message.getFieldWithDefault(msg, 3, ""),
    description: jspb.Message.getFieldWithDefault(msg, 4, ""),
    email: jspb.Message.getFieldWithDefault(msg, 5, ""),
    contactsList: jspb.Message.toObjectList(msg.getContactsList(),
    models_common_pb.Contact.toObject, includeInstance),
    salt: jspb.Message.getFieldWithDefault(msg, 7, 0),
    hash: jspb.Message.getFieldWithDefault(msg, 8, ""),
    role: jspb.Message.getFieldWithDefault(msg, 9, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.user.UserInfo}
 */
proto.user.UserInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.user.UserInfo;
  return proto.user.UserInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.user.UserInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.user.UserInfo}
 */
proto.user.UserInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSurname(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMiddleName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 6:
      var value = new models_common_pb.Contact;
      reader.readMessage(value,models_common_pb.Contact.deserializeBinaryFromReader);
      msg.addContacts(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSalt(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setHash(value);
      break;
    case 9:
      var value = /** @type {!proto.user.Role} */ (reader.readEnum());
      msg.setRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.user.UserInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.user.UserInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.user.UserInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.UserInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSurname();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMiddleName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getContactsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      models_common_pb.Contact.serializeBinaryToWriter
    );
  }
  f = message.getSalt();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getHash();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getRole();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.user.UserInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string surname = 2;
 * @return {string}
 */
proto.user.UserInfo.prototype.getSurname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setSurname = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string middle_name = 3;
 * @return {string}
 */
proto.user.UserInfo.prototype.getMiddleName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setMiddleName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.user.UserInfo.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string email = 5;
 * @return {string}
 */
proto.user.UserInfo.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * repeated common.Contact contacts = 6;
 * @return {!Array<!proto.common.Contact>}
 */
proto.user.UserInfo.prototype.getContactsList = function() {
  return /** @type{!Array<!proto.common.Contact>} */ (
    jspb.Message.getRepeatedWrapperField(this, models_common_pb.Contact, 6));
};


/**
 * @param {!Array<!proto.common.Contact>} value
 * @return {!proto.user.UserInfo} returns this
*/
proto.user.UserInfo.prototype.setContactsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.common.Contact=} opt_value
 * @param {number=} opt_index
 * @return {!proto.common.Contact}
 */
proto.user.UserInfo.prototype.addContacts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.common.Contact, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.clearContactsList = function() {
  return this.setContactsList([]);
};


/**
 * optional int64 salt = 7;
 * @return {number}
 */
proto.user.UserInfo.prototype.getSalt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setSalt = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional string hash = 8;
 * @return {string}
 */
proto.user.UserInfo.prototype.getHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setHash = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional Role role = 9;
 * @return {!proto.user.Role}
 */
proto.user.UserInfo.prototype.getRole = function() {
  return /** @type {!proto.user.Role} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {!proto.user.Role} value
 * @return {!proto.user.UserInfo} returns this
 */
proto.user.UserInfo.prototype.setRole = function(value) {
  return jspb.Message.setProto3EnumField(this, 9, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.user.User.prototype.toObject = function(opt_includeInstance) {
  return proto.user.User.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.user.User} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.User.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && proto.user.UserID.toObject(includeInstance, f),
    userInfo: (f = msg.getUserInfo()) && proto.user.UserInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.user.User}
 */
proto.user.User.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.user.User;
  return proto.user.User.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.user.User} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.user.User}
 */
proto.user.User.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.user.UserID;
      reader.readMessage(value,proto.user.UserID.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = new proto.user.UserInfo;
      reader.readMessage(value,proto.user.UserInfo.deserializeBinaryFromReader);
      msg.setUserInfo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.user.User.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.user.User.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.user.User} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.User.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.user.UserID.serializeBinaryToWriter
    );
  }
  f = message.getUserInfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.user.UserInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional UserID ID = 1;
 * @return {?proto.user.UserID}
 */
proto.user.User.prototype.getId = function() {
  return /** @type{?proto.user.UserID} */ (
    jspb.Message.getWrapperField(this, proto.user.UserID, 1));
};


/**
 * @param {?proto.user.UserID|undefined} value
 * @return {!proto.user.User} returns this
*/
proto.user.User.prototype.setId = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.user.User} returns this
 */
proto.user.User.prototype.clearId = function() {
  return this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.user.User.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional UserInfo user_info = 2;
 * @return {?proto.user.UserInfo}
 */
proto.user.User.prototype.getUserInfo = function() {
  return /** @type{?proto.user.UserInfo} */ (
    jspb.Message.getWrapperField(this, proto.user.UserInfo, 2));
};


/**
 * @param {?proto.user.UserInfo|undefined} value
 * @return {!proto.user.User} returns this
*/
proto.user.User.prototype.setUserInfo = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.user.User} returns this
 */
proto.user.User.prototype.clearUserInfo = function() {
  return this.setUserInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.user.User.prototype.hasUserInfo = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * @enum {number}
 */
proto.user.Role = {
  REGULAR: 0,
  ADMIN: 1,
  HEAD: 2,
  MODERATOR: 3,
  DEVELOPER: 4
};

goog.object.extend(exports, proto.user);
